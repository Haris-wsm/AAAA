import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import Sidebar from "../sidebar";
import { API_GET, API_POST } from "../api";

const PatientView = () => {
  const [user, setUser] = useState({});
  const [games, setGames] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    // getPateint();
    getGame();
  }, []);

  const getPateint = async () => {
    try {
      const res = await API_GET(`patientData/${id}`);

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGame = async () => {
    try {
      const res = await API_GET(`patient/${id}/games`);
      setGames(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // format 2022-10-12
  const getDate = (format) => {
    if (format) {
      const birthYear = format.split("-")[0];
      const currentYear = new Date().getFullYear();

      console.log(birthYear, currentYear);

      const age = currentYear - birthYear;
      return age;
    }
  };

  const getSex = (sex) => {
    if (sex) {
      return sex === "M" ? "ชาย" : "หญิง";
    }
  };

  const spacing = {
    marginRight: "1rem",
    marginTop: "0.8rem",
    padding: "0.5rem ",
    width: "25%",
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 bg p-0">
          <Sidebar />
        </div>
        <div className="col-10 p-0">
          <h1 className="title">ข้อมูลผู้ป่วย</h1>
          <div className="p-5 hight-one">
            <div className="content border rounded-3 p-4 shadow">
              <div className="px-4 py-4 overflow bg-light h-100">
                <div className="d-flex py-2 ">
                  <div style={spacing}>ลำดับ</div>
                  <div style={spacing}>ประเภท</div>
                  <div style={spacing}>ผลคะแนน</div>
                </div>
                {games &&
                  games.map((game, i) => (
                    <div className="d-flex">
                      <div style={spacing} className="content">
                        <h4 className="text-center">{i + 1}</h4>
                      </div>
                      <div style={spacing} className="content">
                        <h4 className="text-center">{game.game_type_no}</h4>
                      </div>
                      <div style={spacing} className="content">
                        <h4 className="text-center">{game.score}</h4>
                      </div>
                      <Link
                        to={`/patient/view/${id}/game/${game.game_no}`}
                        className="btn me-3 bg-green"
                        style={spacing}
                      >
                        <i className="fa-regular fa-eye fa-xl"></i>
                      </Link>
                    </div>
                  ))}
                {/* <div className="d-flex py-2">
                  <h5 className="mx-2">เพศ :</h5>
                  <h5>{getSex(user.sex)}</h5>
                </div>
                <div className="d-flex py-2">
                  <h5 className="mx-2">อายุ :</h5>
                  <h5>{getDate(user.birthday)}</h5>
                </div>
                <div className="d-flex py-2">
                  <h5 className="mx-2">น้ำหนัก(กก.) :</h5>
                  <h5>{user.weight}</h5>
                </div>
                <div className="d-flex py-2">
                  <h5 className="mx-2">ส่วนสูง(ซม.) :</h5>
                  <h5>{user.height}</h5>
                </div>
                <div className="d-flex py-2">
                  <h5 className="mx-2">ความยาวคอ(ซม.) :</h5>
                  <h5>{user.neck_length}</h5>
                </div>
                <div className="d-flex py-2">
                  <h5 className="mx-2">ความยาวแขน(ซม.) :</h5>
                  <h5>{user.arm_length}</h5>
                </div>
                <div className="d-flex py-2">
                  <h5 className="mx-2">ระยะห่างระหว่างอกถึงเอว :</h5>
                  <h5>{user.bust_waist_length}</h5>
                </div>
                <div className="d-flex py-2">
                  <h5 className="mx-2">ชื่อผู้ใช้ :</h5>
                  <h5></h5>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientView;
