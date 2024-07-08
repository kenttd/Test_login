"use client";
import { getCookie } from "@/app/actions";
import { useEffect, useState } from "react";
import "dotenv/config";

export default function PageMahasiswa() {
  const [token, setToken] = useState("");
  const [data, setData] = useState<Mahasiswa>();
  useEffect(() => {
    fetch("/api/mhsbaru/verifyjwt")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("data ", data.mhs);
        setData(data.mhs);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
      <div>
        {data ? (
          <div>
            <h1>Halaman Mahasiswa Baru</h1>
            Nama : {data.username} <br />
            Email : {data.email} <br />
            Jurusan : {data.jurusan} <br />
            Periode : {data.periode} <br />
          </div>
        ) : (
          "loading..."
        )}
      </div>
    </>
  );
}

interface JwtPayload {
  username: string;
}
interface Mahasiswa {
  username: string;
  email: string;
  jurusan: string;
  periode: string;
}
