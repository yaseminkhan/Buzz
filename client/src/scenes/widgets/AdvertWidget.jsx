import { useEffect, useState } from "react";
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const [ad, setAd] = useState(null);
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const light = palette.neutral.light;

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await fetch("http://localhost:3001/ads/random", {
          method: "GET",
        });
        const data = await response.json();
        setAd(data);
      } catch (error) {
        console.error("Failed to fetch ad", error);
      }
    };

    fetchAd();
  }, []);

  if (!ad) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={`http://localhost:3001/assets/${ad.picturePath}`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween onClick={() => window.open(ad.URL, '_blank')}>
      <Typography color={main}
            sx={{
                "&:hover" : {
                color: medium,
                cursor: "pointer"
                }
        }}>
            {ad.title}
        </Typography>
        <Typography color={medium}
            sx={{
                "&:hover" : {
                color: light,
                cursor: "pointer"
                }
        }}>
            {ad.URL_name}
        </Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        {ad.description}
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
