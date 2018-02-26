$(document).ready(function() {
    
    var options = {

    url: "json/currencies.json",

    getValue: "symbol",

    template: {
        type: "description",
        fields: {
            description: "name"
        }
    },

    list: {
        match: {
            enabled: true
        }
    },

    theme: "plate-dark"
};

$("#currencies").easyAutocomplete(options);

$("#selectedCurrency").click(function(event){
    var selection = $("#currencies").val();
    $("#currencies").val("");
});
})