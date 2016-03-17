function get_area(area_id) {
    $.ajax({
        url: "/async/area_non_tree",
        cache: false,
        dataType: "json",
        data: {"area_id": area_id},
        type: "POST",
        success: function (json) {
            bind_area(json);
        }
    });
}
function bind_area(json) {
    var province_select = $("#province_select");
    var city_select = $("#city_select");
    var zone_select = $("#zone_select");

    if (json != null) {
        province_select.empty();
        city_select.empty();
        zone_select.empty();

        var all_id_string = json.all_id_string;
        var result = all_id_string.split('_');
        var provinceId = result[0];
        var cityId = result[1];
        var zoneId = result[2];

        var province = json.province;
        var city = json.city;
        var zone = json.zone;

        var province_length = province.length;
        var city_length = city.length;
        var zone_length = zone.length;

        var province_html = "";
        var city_html = "";
        var zone_html = "";

        for (var i = 0; i < province_length; i++) {
            var name = province[i].name;
            var id = province[i].id;
            if (id == provinceId) {
                province_html += "<option selected value='" + id + "'>" + name + "</option>";
            }
            else {
                province_html += "<option value='" + id + "'>" + name + "</option>";
            }
        }
        for (var i = 0; i < city_length; i++) {
            var name = city[i].name;
            var id = city[i].id;
            if (id == cityId) {
                city_html += "<option selected value='" + id + "'>" + name + "</option>";
            }
            else {
                city_html += "<option value='" + id + "'>" + name + "</option>";
            }
        }
        for (var i = 0; i < zone_length; i++) {
            var name = zone[i].name;
            var id = zone[i].id;
            if (id == zoneId) {
                zone_html += "<option selected value='" + id + "'>" + name + "</option>";
            }
            else {
                zone_html += "<option value='" + id + "'>" + name + "</option>";
            }
        }
        province_select.append(province_html);
        city_select.append(city_html);
        zone_select.append(zone_html);
        if (zone_html == "") {
            zone_select.hide();
        } else {
            zone_select.show();
        }
    }
}