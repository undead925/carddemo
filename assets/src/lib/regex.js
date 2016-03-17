var qtyd_regex = {
    phone: function (value) {
        var r = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}|17[0-9]{9}$|18[0-9]{9}|1[3578][0-9]\*{4}[0-9]{4}$/;
        return r.test(value);
    },
    card_id_reg: function (value) {
        var r = /\d{17}[0-9xX]/;
        return r.test(value);
    },
    number: function (value) {
        var r = /^\d+$/;
        return r.test(value);
    },
    money: function (value) {
        var r = /(^[-+]?[1-9]\d*(\.\d{1,2})?$)|(^[-+]?[0]{1}(\.\d{1,2})?$)/;
        return r.test(value);
    },
    bank_account: function (value) {
        var r = /^\d{15,19}$/;
        return r.test(value);
    },
    email: function (value) {
        var r = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return r.test(value);
    },
    valid_code: function (value) {
        var r = /^\d{6}$/;
        return r.test(value);
    }
};