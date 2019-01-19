$(function() {
    var registered=0;
    var paid=0;
    var checkedIn=0;
        $("#jsGrid").jsGrid({
            height: "70%",
            width: "100%",
            filtering: true,
            inserting: false,
            editing: false,
            sorting: true,
            paging: true,
            autoload: true,
            pageSize: 10,
            pageButtonCount: 5,
            deleteConfirm: "Do you really want to delete client?",
            controller: {
                loadData: function(filter) {
                    var data= $.ajax({
                        type: "GET",
                        url: "jsgrid-php-master/clients/index.php",
                        data: filter
                    });
                    return data;
                }
            },
            fields: [
                { name: "NUID", title: "NUID", type: "text", width: 50  },
                { name: "name", title: "Name", type: "text", width: 100},
                { name: "college", title: "College", type: "text", width: 100 },
                { name: "email", type: "text", title: "Email-id", sorting: false},
                { name: "contact", type: "number", title: "Contact Number", sorting: false, filtering: true },
				{name:"payment", title:"Payment",
        itemTemplate: function(_, item) {
            if(item.payment==1)
            return "Paid";
            return "Unpaid";
}
}
       
            ]
        });

    });