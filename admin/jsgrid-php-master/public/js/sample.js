$(function() {
    var registered=0;
    var paid=0;
    var checkedIn=0;
        $("#jsGrid").jsGrid({
            height: "70%",
            width: "100%",
            filtering: true,
            inserting: false,
            editing: true,
            sorting: true,
            paging: true,
            autoload: true,
            pageSize: 100,
            pageButtonCount: 5,
            deleteConfirm: "Do you really want to delete client?",
            controller: {
                loadData: function(filter) {
                    var data= $.ajax({
                        type: "GET",
                        url: "jsgrid-php-master/clients/index.php",
                        data: filter
                    });
                    $.post("./getCount.php",
					  {},
					function(data,status){
                        var count=$.parseJSON(data);
                        registered=count.registered;
                        paid=count.paid;
                        checkedIn=count.checkedin;
                        $("#checkedin").text(checkedIn);
                        $("#paid").text(paid);
                        $("#registered").text(registered);
                    });
                    return data;
                },
                insertItem: function(item) {
                    return $.ajax({
                        type: "POST",
                        url: "jsgrid-php-master/clients/index.php",
                        data: item
                    });
                },
                updateItem: function(item) {
                    return $.ajax({
                        type: "PUT",
                        url: "jsgrid-php-master/clients/index.php",
                        data: item
                    });
                },
                deleteItem: function(item) {
                    return $.ajax({
                        type: "DELETE",
                        url: "inno/jsgrid-php-master/clients/index.php",
                        data: item
                    });
                }
            },
            fields: [
                { name: "NUID", title: "NUID", type: "number", width: 50,filtering:true },
                { name: "name", title: "Name", type: "text", width: 100},
                { name: "college", title: "College", type: "text", width: 100, filtering: true },
                { name: "email", type: "text", title: "Email-id", sorting: true, filtering: true},
                { name: "contact", type: "number", title: "Contact Number", sorting: false, filtering: true },
                { name: "attendance", title: "Attendance",
                    itemTemplate: function(_, item) {
                        if(item.attendance==1)
                        return "Checked In";
                        return $("<button>").text("Check in").on("click", function() {
                                item.attendance=1;
                                $("#jsGrid").jsGrid("updateItem",item);
                                checkedIn=checkedIn+1;
                                $("#checkedin").text(checkedIn);

                });
            }
        },
        {name:"payment", title:"Payment",
        itemTemplate: function(_, item) {
            if(item.payment==1)
            return "Paid";
            return $("<button>").text("Paid").on("click", function() {
                    item.payment=1;
                    $("#jsGrid").jsGrid("updateItem",item);
                    paid=paid+1;
                    $("#paid").text(paid);
    });
}
},
                { type: "control" }
            ]
        });

    });