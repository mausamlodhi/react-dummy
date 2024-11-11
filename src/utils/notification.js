import toastr from "toastr";

const modalNotification = ({ type, message }) => {
  let icon = {
    info: "ni ni-info-fill",
    success: "ni ni-check-circle-fill",
    error: "ni ni-cross-circle-fill",
    warning: "ni ni-alert-fill",
  };

  let msg = `<span class="toastr-icon"><em class="icon ${icon[type]}"></em></span><div class="toastr-text">${message}</div>`;
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-top-right",
    closeHtml: '<span class="btn-trigger">&#10006;</span>',
    preventDuplicates: true,
    showDuration: "1500",
    hideDuration: "1500",
    timeOut: "2000",
    toastClass: "toastr",
    extendedTimeOut: "5000",
  };
  // eslint-disable-next-line
  toastr[type](msg);
};

export default modalNotification;
