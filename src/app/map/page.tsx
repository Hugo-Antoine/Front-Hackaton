import TopHeader from "@/component/Header";
import MapComponent from "@/component/Map";
import BottomNavbar from "@/component/NavBar";
import { Box } from "@mantine/core";

export default async function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopHeader />
      <Box style={{ flex: 1, minHeight: 0 }}>
        <MapComponent />
      </Box>
      <BottomNavbar active="map" />
    </div>
  );
}
