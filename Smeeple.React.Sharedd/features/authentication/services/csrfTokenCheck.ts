export default () => /^(.*;)?XSRF-TOKEN=[^;]+(.*)?$/.test(document.cookie);
