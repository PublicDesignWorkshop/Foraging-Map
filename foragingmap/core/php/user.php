<?php
    header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
    header("Cache-Control: post-check=0, pre-check=0", false);
    header("Pragma: no-cache");
    
    ob_start();
    session_start();
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
            break;
        case 'GET':
			      login();
            break;
        case 'PUT':
            break;
        case 'DELETE':
            break;
    }
    
    function login() {
		    
        if ($_SESSION['user_auth'] != null && $_SESSION['user_auth'] != 0 && $_SESSION['user_username'] != null) {
            $sql = "SELECT `username`, `name`, `auth` FROM `fm_user` WHERE (`username` = :username) AND (`auth` = :auth)";
            $data = json_decode(file_get_contents('php://input'));
            if ($data != null) {
			          $params = array(
				            "username" => $_SESSION['user_username'],
				            "auth" => $_SESSION['user_auth'],
			          );
                $logout = $data->{'logout'};
		        } else {
			          $params = array(
				            "username" => $_SESSION['user_username'],
				            "auth" => $_SESSION['user_auth'],
			          );
                $logout = $_GET['logout'];
		        }
            if ($logout == "true") {
                $_SESSION['user_auth'] = 0;
                $_SESSION['user_username'] = null;
            } else {
                try {
                    $pdo = getConnection();
                    $stmt = $pdo->prepare($sql);
                    $stmt->execute($params);
                    
			              $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
			              if (sizeof($items) != 0) {
				                foreach ($items as $item) {
					                $_SESSION['user_auth'] = $item['auth'];
                          $_SESSION['user_username'] = $item['username'];
					                echo json_encode($item);
				                }
			              } else {
				                $_SESSION['user_auth'] = 0;
                        $_SESSION['user_username'] = null;
				                echo "access failed";
			              }            
                } catch(PDOException $e) {
                    echo '{"error":{"text":'. $e->getMessage() .'}}';
                }
            }
            
        } else {
            $sql = "SELECT `username`, `name`, `auth` FROM `fm_user` WHERE (`username` = :username) AND (`password` = :password)";
            $data = json_decode(file_get_contents('php://input'));
            $params = null;
		        if ($data != null) {
			          $params = array(
				            "username" => $data->{'username'},
				            "password" => $data->{'password'},
			          );
		        } else {
			          $params = array(
				            "username" => $_GET['username'],
				            "password" => $_GET['password'],
			          );
		        }
            try {
                $pdo = getConnection();
                $stmt = $pdo->prepare($sql);
                $stmt->execute($params);
			          $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
			          if (sizeof($items) != 0) {
				            foreach ($items as $item) {
					            $_SESSION['user_auth'] = $item['auth'];
                      $_SESSION['user_username'] = $item['username'];
					            echo json_encode($item);
				            }
			          } else {
				            $_SESSION['user_auth'] = 0;
                    $_SESSION['user_username'] = null;
				            echo "access failed";
			          }            
            } catch(PDOException $e) {
                echo '{"error":{"text":'. $e->getMessage() .'}}';
            }
        }
    }
?>