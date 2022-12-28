import { SideNavInfo } from "../constants";

export const getActiveMenuFromPath = (path) => {
    if (path.includes("why-waaw")) {
        return "WHY_WAAW";
    } else if (path.includes("pricing")) {
        return "PRICING";
    }
    const dashboardMenus = [
        ...SideNavInfo.admin, 
        ...SideNavInfo.employee, 
        ...SideNavInfo.manager, 
        ...SideNavInfo.superAdmin
    ].filter(menu => menu.text !== 'Dashboard')
    if (dashboardMenus.some(menu => path.includes(menu.text.replace(/\s+/g, '-'.toLowerCase())))) {
        return dashboardMenus.find(menu => path.includes(menu.text.replace(/\s+/g, '-'.toLowerCase()))).activeKey;
    } else {
        return 'DASHBOARD';
    }
};

export const getPageLayoutFromPath = (path) => {
    if (path.includes("dashboard")) {
        return "dashboard";
    } else if (path.includes("login") || path.includes('pricing') || path.includes('why-waaw') || path === '/') {
        return "loggedOut";
    } else return "fullPage";
};