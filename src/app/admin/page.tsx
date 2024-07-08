"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteCookie } from "@/app/actions";
import { useRouter } from "next/navigation";
import { AdminTable } from "@/components/adminTable";
import { ChartAdmin } from "@/components/chartAdmin";
import { ModeToggle } from "@/components/mode-toggle";
import { AddAdminButton } from "@/components/addAdminButton";

export default function AdminHome() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [update, setUpdate] = useState(true);
  const [status, setStatus] = useState("Pending");
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/api/admin/verifyjwt")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUser(data.rows[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    console.log("fetching data");
    fetch(`/api/admin/mhsbaru?status=${status}`, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setData(data.data);
        console.log("dataaa ", data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [status, update]);
  return (
    <div>
      <div className="flex justify-between p-4">
        <div className="flex justify-center">
          {user ? <div>Welcome, {user.name}</div> : <div>Loading...</div>}
          <img src={user?.picture} alt="" className="h-10 pl-3" />
        </div>

        <div className="flex space-x-3">
          <AddAdminButton />
          <Button
            variant="destructive"
            onClick={() => {
              deleteCookie("token");
              router.push("/admin/login");
            }}
          >
            Log out
          </Button>
          <ModeToggle />
        </div>
      </div>
      <div></div>
      <div className="flex space-x-2">
        <div className="flex-grow-[3]">
          <AdminTable
            update={update}
            setUpdate={setUpdate}
            data={data}
            setStatus={setStatus}
            setData={setData}
          />
        </div>
        <div className="flex-grow-[1]">
          <ChartAdmin chartData={processData(data)} />
        </div>
      </div>
    </div>
  );
}

interface User {
  name: string;
  picture: string;
}

function processData(data: any) {
  const transformedData = data.reduce((acc: any, item: any) => {
    if (item.jurusan === "S1 - Informatika") {
      acc.informatika = (acc.informatika || 0) + 1;
    } else if (item.jurusan === "S1 - Teknik Industri") {
      acc.industri = (acc.industri || 0) + 1;
    }
    return acc;
  }, {});
  return [transformedData];
  // return [
  //   {
  //     informatika: 3,
  //     industri: 2,
  //   },
  // ];
  // return [
  //   { jurusan: "S1 - Informatika", total: 3 },
  //   { jurusan: "S1 - Teknik Industri", total: 2 },
  // ];
  // return result;
}
