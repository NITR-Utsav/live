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
        $sql = "SELECT * FROM users WHERE name LIKE ? AND email LIKE ?";
        $q = $this->db->prepare($sql);
        $q->bind_param("ss", $name,$email);
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


    public function update($data) {
        $sql = "UPDATE users SET name = ?, college = ?, contact = ?, email = ?, paid = ?, checkin=? WHERE uid = ?";
        $q = $this->db->prepare($sql);
        $q->bind_param("sssssss", $data["name"],$data["college"], $data["contact"], $data["email"], $data["payment"], $data["attendance"],$data["NUID"]);
        $q->execute();
    }

    public function remove($id) {
        $sql = "DELETE FROM clients WHERE id = :id";
        $q = $this->db->prepare($sql);
        $q->bindParam(":id", $id, PDO::PARAM_INT);
        $q->execute();
    }

}

?>