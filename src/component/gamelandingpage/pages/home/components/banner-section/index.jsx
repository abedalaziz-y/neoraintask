import React, { useState } from "react";
import { Modal, Input, Button as AntdButton } from "antd"; // Import Modal and Input from Ant Design

import * as Styles from "./styles";

import Navbar from "../../../../components/navbar";
import Divider from "../../../../components/divider";
import Platforms from "../../../../components/platforms";

import hero2 from "../../../../assets/images/hero2.png";
import { ButtonOutline } from "../../../../components/button/styles.js";
import { Button } from "../../../../components/button/index.jsx";
import { useSelector } from "react-redux";
import { LOGUSERACTIVITY } from "../../../../../../functions/auth.js";

const BannerSection = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search input value
const {user}=useSelector(state=>({...state}))
  const handleSearchClick = () => {
    setIsModalVisible(true); // Show the modal
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // Hide the modal
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value); // Update search query
  };

  const handleSearchSubmit=async () => {
    console.log("Search Query:", searchQuery); // Replace with your search logic
    // alert(`Searching for: ${searchQuery}`);
    setIsModalVisible(false); // Close the modal after search
      if (!searchQuery.trim()) {
        alert("Please enter a search query!");
        return;
      }
    
      try {
        // Prepare the activity data
        const activity = {
          activity: "search",
          text: searchQuery, // The search query entered by the user
        };
    
        // Call the LOGUSERACTIVITY function
        const response = await LOGUSERACTIVITY(user.token, activity); // Replace with actual user auth token
    
        console.log("Activity logged:", response.data); // Log the response for debugging
        alert("Search activity has been recorded!");
      } catch (error) {
        console.error("Error logging activity:", error);
        alert("An error occurred while logging your activity. Please try again.");
      } finally {
        setIsModalVisible(false); // Close the modal
      }

  };

  return (
    <Styles.BannerSection>
      {/* <Navbar /> */}
      <Divider />
      <Styles.BannerContainer>
        <Styles.BannerInfo>
          <Styles.BannerText>
            <h2>VALUE</h2>
            <h1 className="text-danger">Gaming Mania</h1>
            <p>
              Welcome to our gaming recommendation site, your ultimate
              destination for discovering new adventures and unlocking endless
              entertainment. Explore curated recommendations, insightful
              reviews, and comprehensive guides tailored to your gaming
              preferences. Join a vibrant community of fellow gamers and embark
              on epic quests together. Let the games begin!
            </p>
            <Styles.BannerFlexButtons>
              <Button className="large">Play Game</Button>
              <ButtonOutline
                className="large text-danger"
                onClick={handleSearchClick} // Show modal on click
              >
                Search More
              </ButtonOutline>
            </Styles.BannerFlexButtons>

            <Styles.BannerDivider />
            <Styles.BannerPlataforms>
              <Platforms />
            </Styles.BannerPlataforms>
          </Styles.BannerText>
        </Styles.BannerInfo>

        <Styles.BannerMascotContainer>
          <img src={hero2} alt="hero" style={{ pointerEvents: "none" }} />
        </Styles.BannerMascotContainer>
      </Styles.BannerContainer>

      {/* Ant Design Modal */}
      <Modal
        title="Search for Games"
        open={isModalVisible}
        onCancel={handleModalClose} // Close modal on cancel
        footer={[
          <AntdButton key="cancel" onClick={handleModalClose}>
            Cancel
          </AntdButton>,
          <AntdButton
            key="search"
            type="primary"
            onClick={handleSearchSubmit} // Submit search on click
          >
            Search
          </AntdButton>,
        ]}
      >
        <Input
          placeholder="Enter game name or keyword..."
          value={searchQuery}
          onChange={handleInputChange}
          onPressEnter={handleSearchSubmit} // Trigger search on Enter key
          style={{ marginTop: "10px", marginBottom: "20px" }}
        />
      </Modal>
    </Styles.BannerSection>
  );
};

export default BannerSection;
