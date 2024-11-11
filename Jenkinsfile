pipeline {
  environment {
    PROJECT_NAME = "loopity"
    PROJECT_PATH = "/var/www/html/"
    PROJECT_SUFFIX = "react"
    NODE_VERSION="14.18"
    SONAR_HOST = "http://172.16.10.158:9005"
    SONARQUBE_KEY = "Jenkins-SonarQube-Key"
    IP_ADDRESS="85.239.230.211"
    MS_TEAMS_WEBHOOK_URL = "webhook_url_web_channel"
    GIT_COMMIT_MSG = sh (script: """git log -1 --pretty=%B ${GIT_COMMIT}""", returnStdout:true).trim()
    }
  agent any
  options {
        ansiColor('xterm')
        buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '30', numToKeepStr: '15')
        disableConcurrentBuilds()
        timeout(time: 30, unit: 'MINUTES')
  }

  tools {nodejs "NodeJs_16"}

    stages {
        stage('ENV Variable') {
           steps {
                script { 
                    try {
                        echo "=========> Do you want to add environment variables in .env file?"
                        timeout(time:30, unit:'SECONDS') {
                        env.ENV_FILE = input message: "Add environment variables file",
                        parameters: [choice(name: 'Do you want to add new env variables file?', choices: 'yes\nno', description: 'Choose "yes" to add file')]
                        }
                    if("${env.ENV_FILE}" == 'yes'){
                        echo "=========> Please enter environment variables."
                        timeout(time:30, unit:'SECONDS') {
                        env.userInputTxt = input(
                        id: "inputTextbox",
                        message: 'Paste All environment variables to be added in .env file',
                        parameters: [[$class: 'TextParameterDefinition', description: 'Environment Variables',name: 'input']])  
                            }
                        }
                    }catch(err){
                    env.ENV_FILE = 'no'
                    env.userInputTxt = 'null'
                    }
                }
            }
        }
        stage('CodeQuality Check via SonarQube') {
          steps {
              withSonarQubeEnv(credentialsId: "${SONARQUBE_KEY}", installationName: 'Codiant SonarQube') {
              script {
              def gradleHome = tool 'GradleOnline';
              def scannerHome = tool 'SonarOnline';
              withSonarQubeEnv("Codiant SonarQube") {
              sh "${tool("SonarOnline")}/bin/sonar-scanner -X \
              -Dsonar.sources=. \
              -Dsonar.exclusions= \
              -Dsonar.projectKey=${env.PROJECT_NAME}-${env.PROJECT_SUFFIX}:${env.BRANCH_NAME} \
              -Dsonar.host.url=${env.SONAR_HOST}"
                  }
              }
          }
      }
   }
        stage('Build React App') {
            agent {
               docker {
                  image "node:$NODE_VERSION" 
                  args '-u root:root'
                }
            }
            steps {
                script {
                   env.DOCKER_PATH = env.WORKSPACE
                   if("${env.ENV_FILE}" == 'yes') {
                        sh """ 
                          echo 'Uploading ENV Variables in .env file!!'
                          cat > ${env.DOCKER_PATH}/.env << EOF
                            ${userInputTxt}
                          """
                       }
                    sh """
                       npm install
                       npm run build
                       """
                }   
            }
        }
        stage('Copy Artifacts') {
           steps {
            withCredentials([sshUserPrivateKey(credentialsId: 'contabo-development-key', keyFileVariable: 'KEY', usernameVariable: 'USERNAME')]) {
            script {
                 sh """
                  sudo rsync -rv --rsync-path="sudo rsync" --mkpath -e 'ssh -i ${KEY} -p 22 -o StrictHostKeyChecking=no' ${DOCKER_PATH}/build/* ${USERNAME}@${IP_ADDRESS}:${PROJECT_PATH}${PROJECT_NAME}-${PROJECT_SUFFIX}-${env.BRANCH_NAME}
                 """
                }
            }
        }
        }
    }

    post {
        always {
            withCredentials(bindings: [string(credentialsId: "${MS_TEAMS_WEBHOOK_URL}", variable: 'TEAMS_WEBHOOK_URL_CPANEL')]) {
                office365ConnectorSend webhookUrl: "${TEAMS_WEBHOOK_URL_CPANEL}",
                color: "${currentBuild.currentResult} == 'SUCCESS' ? '00ff00' : 'ff0000'",
                factDefinitions:[
                    [ name: "Commit Message", template: "${env.GIT_COMMIT_MSG}"]
                ]
            }
        }
    }
}
