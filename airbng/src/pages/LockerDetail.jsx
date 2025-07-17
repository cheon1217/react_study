import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LockerLoading from "../components/locker/LockerLoading";
import LockerError from "../components/locker/LockerError";
import LockerImages from "../components/locker/LockerImages";
import LockerPrice from "../components/locker/LockerPrice";
import LockerInfo from "../components/locker/LockerInfo";
import LockerReserveButton from "../components/locker/LockerReserveButton";
import Header from "../components/Header";

function LockerDetail() {
  const { lockerId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lockerDetail, setLockerDetail] = useState(null);

  useEffect(() => {
    async function fetchLocker() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`http://localhost:9000/AirBnG/lockers/${lockerId}`);
        if (!response.ok) throw new Error("API 호출 실패");
        const data = await response.json();
        if (data.code === 1000 && data.result) {
          setLockerDetail(data.result);
        } else {
          throw new Error(data.message || "보관소 정보를 불러오는데 실패했습니다.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (lockerId) fetchLocker();
  }, [lockerId]);

  const handleReserve = (id) => {
    // 로그인 체크 등 추가 가능
    navigate(`/page/reservations/form?lockerId=${id}`);
  };

  return (
    <div className="container">
      <Header title="보관소 상세" showBackButton={true} />
      <div className="content">
        {loading && <LockerLoading />}
        {error && <LockerError message={error} />}
        {lockerDetail && (
          <div id="lockerDetailContent">
            <div className="locker-title">{lockerDetail.lockerName}</div>
            <LockerImages images={lockerDetail.images} />
            <LockerPrice jimTypeResults={lockerDetail.jimTypeResults} />
            <LockerInfo lockerDetail={lockerDetail} />
            <LockerReserveButton
              lockerId={lockerDetail.lockerId}
              isAvailable={lockerDetail.isAvailable}
              onReserve={handleReserve}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default LockerDetail;