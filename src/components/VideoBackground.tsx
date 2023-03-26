import React from "react";
// @ts-ignore
import bgFon from '../video/bgFon.mp4'
import styled from "styled-components";

export const VideoBackground = () => {
    return (
        <BgVideo autoPlay muted loop >
            <source src={bgFon} type="video/mp4" />
        </BgVideo>
    );
};


const BgVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

