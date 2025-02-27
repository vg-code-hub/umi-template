/*
 * @Author: zdd
 * @Date: 2025-01-07 21:26:43
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2025-02-27 11:15:01
 * @FilePath: user.ts
 */
import { useCallback, useEffect, useState } from "react";
import { history, useModel } from "umi";

export const getRole = () => localStorage.getItem("role") ?? "";
export const setRole = (role?: string) =>
  localStorage.setItem("role", role ?? "");

export default function useAuthModel() {
  const [user, setUser] = useState<string | undefined>(getRole());
  const { setInitialState } = useModel("@@initialState");

  const signin = useCallback((role: string) => {
    setUser(role);
    setInitialState({
      role,
    });
    setTimeout(() => {
      history.replace("/");
      window.location.reload();
    }, 100);
  }, []);

  const signout = useCallback(() => {
    setUser(undefined);
    setInitialState({
      role: "",
    });
  }, []);

  useEffect(() => {
    setRole(user);
  }, [user]);

  return {
    user,
    signin,
    signout,
  };
}
