<?php

include "Client.php";

class ClientRepository {

    protected $db;

    public function __construct($db) {
        $this->db = $db;
    }

    private function read($row) {
        $result = new Client();
        $result->NUID = $row["uid"];
        $result->name = $row["name"];
        $result->college = $row["college"];
        $result->email = $row["email"];
        $result->contact = $row["contact"];
        $result->payment = $row["paid"];
        $result->attendance = $row["checkin"];
        return $result;
    }

    public function getById($id) {
        $sql = "SELECT * FROM users WHERE uid = ?";
        $q = $this->db->prepare($sql);
        $q->bind_param("s", $id);
        $q->execute();
        $result=$q->get_result() or die("Failed to connect to MySQL: " . mysqli_error($con));
        $row = $result->fetch_array(MYSQLI_ASSOC);
        return $this->read($row);
    }

    public function getAll($filter) {
        $name = "%" . $filter["name"] . "%";
        $email = "%" . $filter["email"] . "%";
        $sql = "SELECT u.* FROM event_user eu,users u WHERE name LIKE ? AND email LIKE ? AND eu.eid=? and u.uid=eu.uid";
        $q = $this->db->prepare($sql);
        $q->bind_param("sss", $name,$email,$_SESSION['event_id']);// get event id from session
        $q->execute();
        $result=$q->get_result();
        $rows=array();
        while($row=$result->fetch_array(MYSQLI_ASSOC))
            array_push($rows,$row);

        $result1 = array();
        foreach($rows as $row) {
            array_push($result1, $this->read($row));
        }
        return $result1;
    }

}

?>