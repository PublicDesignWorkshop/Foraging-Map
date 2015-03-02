<?php
    //header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    //header("Cache-Control: post-check=0, pre-check=0", false);
    //header("Pragma: no-cache");
    
    require('database.php');	
    function getConnection() {
        $db = new database;
        $dbhost = $db->host;
        $dbport = $db->port;
        $dbuser = $db->username;
        $dbpass = $db->password; 
        $dbname = $db->db_name;
        $dbh = new PDO("mysql:host=$dbhost;port=$dbport;dbname=$dbname", $dbuser, $dbpass);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $dbh;
    }

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':
            create();
            break;
        case 'GET':
            read();
            break;
        case 'PUT':
            update();
            break;
        case 'DELETE':
            delete();
            break;
    }
    
    function read() {
        $sql = "SELECT * FROM `fm_picture` WHERE (`id` = :id)";
        $data = json_decode(file_get_contents('php://input'));
        $params = null;
        if ($data != null) {
            $params = array(
                "id" => $data->{'id'},
            );
        } else {
            $params = array(
                "id" => $_GET['id'],
            );
        }
        
        try {
            $pdo = getConnection();
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $result = $stmt->fetchAll(PDO::FETCH_OBJ);
            $pdo = null;
            echo json_encode($result);
        } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}';
        }
    }
    
    function update() {
        session_start();
        if ($_SESSION['user_auth'] == 1) {    // admin
            $sql = "UPDATE `fm_picture` SET `pid` = :pid, `name` = :name, `url` = :url, `date` = :date, `update` = :update  WHERE (`id` = :id)";
            $data = json_decode(file_get_contents('php://input'));
            $params = array(
                "id" => $data->{'id'},
                "pid" => $data->{'pid'},
                "name" => $data->{'name'},
                "url" => $data->{'url'},
                "date" => $data->{'date'},
                "update" => date("Y-m-d H:i:s"),
            );
        
            try {
                $pdo = getConnection();
                $stmt = $pdo->prepare($sql);
                $stmt->execute($params);
            
                $sql = "SELECT * FROM `fm_picture` WHERE (`id` = :id)";
                $params = array(
                    "id" => $data->{'id'},
                );
            
                try {
                    $stmt = $pdo->prepare($sql);
                    $stmt->execute($params);
                    $result = $stmt->fetchAll(PDO::FETCH_OBJ);
                    $pdo = null;
                    echo json_encode($result);
                } catch(PDOException $e) {
                    echo '{"error":{"text":'. $e->getMessage() .'}}';
                }
            } catch(PDOException $e) {
                echo '{"error":{"text":'. $e->getMessage() .'}}';
            }
        } else {    // non-admin
            echo 'not authorized';
        }
    }
    
    function delete() {
        session_start();
        if ($_SESSION['user_auth'] == 1) {    // admin
            $sql = "DELETE FROM `fm_picture` WHERE `id` = :id";
            $data = json_decode(file_get_contents('php://input'));
            $params = array(
                "id" => $data->{'id'},
            );
            try {
                $pdo = getConnection();
                $stmt = $pdo->prepare($sql);
                $result = $stmt->execute($params);
                $pdo = null;
                echo json_encode($result);
            } catch(PDOException $e) {
                echo '{"error":{"text":'. $e->getMessage() .'}}';
            }
        } else {    // non-admin
            echo 'not authorized';
        }
    }
    
    function create() {
        session_start();
        if ($_SESSION['user_auth'] == 1) {    // admin
            $sql = "INSERT INTO `fm_picture` VALUES ( NULL, :pid, :name, :url, :date, :update )";
            $data = json_decode(file_get_contents('php://input'));
            $params = array(
                "pid" => $data->{'pid'},
                "name" => $data->{'name'},
                "url" => $data->{'url'},
                "date" => $data->{'date'},
                "update" => date("Y-m-d H:i:s"),
            );
        
            try {
                $pdo = getConnection();
                $stmt = $pdo->prepare($sql);
                $stmt->execute($params);
            
                $sql = "SELECT * FROM `fm_picture` WHERE `id` = :id";
                $params = array(
                    "id" => $pdo->lastInsertId(),
                );
                try {
                    $stmt = $pdo->prepare($sql);
                    $stmt->execute($params);
                    $result = $stmt->fetchAll(PDO::FETCH_OBJ);
                    $pdo = null;
                    echo json_encode($result);
                } catch(PDOException $e) {
                    echo '{"error":{"text":'. $e->getMessage() .'}}';
                }
            } catch(PDOException $e) {
                echo '{"error":{"text":'. $e->getMessage() .'}}';
            }
        } else {    // non-admin
            echo 'not authorized';
        }
    }
?>