import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {format} from 'timeago.js'
import axios from "axios";
import { view } from "../redux/videoSlice";
import { useDispatch } from "react-redux";
const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: 45px;
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: px;

  @media(max-width: 559px){
    width:250px;
    margin-left: 40px;
  }
  @media(max-width: 321px){
    width:200px;
    margin-left: 30px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type , video}) => {
  const [channel, setChannel] = useState({});
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`http://localhost:5000/api/users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  const videoView = async (videoId) => {
    await axios.put(`http://localhost:5000/api/videos/view/${videoId}`);
    dispatch(view(videoId));
  }

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }} onClick={() => videoView(video._id)}>
      <Container type={type}>
        <Image
          type={type}
          src={video.imgUrl}
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src={channel.img}
          />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>{video.views} views • {format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;