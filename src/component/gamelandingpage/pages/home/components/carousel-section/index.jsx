import React, { useState } from "react";
import * as Styles from "./styles";
import { Modal, Button } from "antd"; // Import Ant Design components
import img1 from "../../../../assets/images/carousel_1.jpeg";
import img2 from "../../../../assets/images/carousel_2.jpg";
import img3 from "../../../../assets/images/carousel_3.jpg";
import img4 from "../../../../assets/images/carousel_4.png";
import { LOGUSERACTIVITY } from "../../../../../../functions/auth.js";
import { ReactComponent as Pagination } from "../../../../assets/images/carousel_pagination.svg";
import { useSelector } from "react-redux";
const images = [
  { src: img1, alt: "Carousel 1" },
  { src: img2, alt: "Carousel 2" },
  { src: img3, alt: "Carousel 3" },
  { src: img4, alt: "Carousel 4" },
];

const CarouselSection = () => {
  const {user}=useSelector(state=>({...state}))
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const handleDownload = async() => {
    const link = document.createElement("a");
    link.href = selectedImage.src;
    link.download = selectedImage.alt || "image";
    link.click();

    try {
      // Prepare the activity data
      const activity = {
        activity: "download hero image",
        link: link.href, // The search query entered by the user
      };
  
      // Call the LOGUSERACTIVITY function
      const response = await LOGUSERACTIVITY(user.token, activity); // Replace with actual user auth token
  alert("Download activity has been recorded!");
     
    } catch (error) {
      console.error("Error logging activity:", error);
      alert("An error occurred while download . Please try again.");
    } finally {
    
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <Styles.CarouselSection>
      <Styles.CarouselContainer id="section-gallery">
        <Styles.CarouselHeader>
          <Styles.CarouselContainerTitle>
            What will you choose?
            <p style={{ fontSize: 16, color: "gray" }}>
              From magical tacticians to fierce brutes and cunning rogues, Dota
              2's hero pool is massive and limitlessly diverse. Unleash
              incredible abilities and devastating ultimates on your way to
              victory.
            </p>
          </Styles.CarouselContainerTitle>
          <Pagination />
        </Styles.CarouselHeader>

        <Styles.CarouselContainerImages>
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              style={{ width: 300, objectFit: "cover", cursor: "pointer" }}
              onClick={() => handleImageClick(image)} // Handle click on image
            />
          ))}
        </Styles.CarouselContainerImages>
      </Styles.CarouselContainer>

      {/* Modal for full-screen image */}
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="download" type="primary" onClick={handleDownload}>
            Download
          </Button>,
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
        width="80%"
        centered
      >
        {selectedImage && (
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            style={{ width: "100%", height: "auto" }}
          />
        )}
      </Modal>
    </Styles.CarouselSection>
  );
};

export default CarouselSection;
