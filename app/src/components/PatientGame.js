import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../sidebar";
import { API_GET, API_POST } from "../api";

const PatientGame = () => {
  const [game, setGame] = useState({});
  const { id, gameId } = useParams();
  //

  useEffect(() => {
    getGameBelongToUser();
  }, []);

  const getGameBelongToUser = async () => {
    try {
      const res = await API_GET(`patient/${id}/games/${gameId}`);
      setGame(res.data);
    } catch (error) {
      console.log(error);
    }
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
              <div className="px-4 overflow bg-light h-100">
                <div className="d-flex py-2">
                  <h5 className="mx-2">ลำดับ :</h5>
                  <h5>{game.game_no}</h5>
                </div>
                <div className="d-flex py-2">
                  <h5 className="mx-2">ประเภทเกม :</h5>
                  <h5>{game.game_type_no}</h5>
                </div>
                <div className="d-flex py-2">
                  <h5 className="mx-2">เลขประจำตัวผู้ป่วย :</h5>
                  <h5>{game.patient_no}</h5>
                </div>
                <div className="d-flex py-2">
                  <h5 className="mx-2">ผลคะแนน :</h5>
                  <h5>{game.score}</h5>
                </div>
                <div className="d-flex py-2">
                  <h5 className="mx-2">เวลาที่กำหนด :</h5>
                  <h5>{game.game_no}</h5>
                </div>
                <div className="d-flex py-2">
                  <h5 className="mx-2">เวลาที่ทำได้ :</h5>
                  <h5>{game.game_no}</h5>
                </div>
                <div className="d-flex py-2">
                  <h5 className="mx-2">จำนวนที่ถูกเตือน :</h5>
                  <h5>{game.alert_count}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientGame;
