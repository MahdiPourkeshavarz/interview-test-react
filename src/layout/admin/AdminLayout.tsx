import { Outlet } from "react-router-dom";
import { ButtonGroup } from "../../pages/admin/components/button/ButtonGroup";

export function AdminLayout() {
  return (
    <>
      <div className="myContainer">
        <div className="panelContainer flex h-32 w-full flex-col items-center justify-center pt-10">
          <p className="pb-6 text-2xl font-semibold text-slate-400">
            پنل ادمین
          </p>
          <ButtonGroup />
        </div>
        <Outlet />
      </div>
    </>
  );
}
