import React from "react";
import classes from "./Home.module.css";
import unsplash from "../../assets/unsplash.jpg";
import ItemCard from "./ItemCard";
import speaker from '../../assets/speaker.jpg'
import tv from'../../assets/tv.jpg'
import wdhd from'../../assets/WDhd.jpg'
import headphones from'../../assets/headphones.jpg'


const DUMMY_ITEMS = [
  {
    description:
      "Tronsmart Force 2 Bluetooth Speaker Waterproof Portable Speakers Wireless,Outdoor Speakers with Bluetooth 5.0 and Speaker Loud,IPX7 Waterproof 30W Max Output-Black",
    price: "43.99",
    rating: "4",
    image: speaker,
    id:'i1'
  },
  {
    description:
      "Sony X85J 75 Inch TV: 4K Ultra HD LED Smart Google TV with Native 120HZ Refresh Rate, Dolby Vision HDR, and Alexa Compatibility KD75X85J- 2021 Model,Black",
    price: "1198.00",
    rating: "5",
    image: tv,
    id:'i2'
  },
  {
    description:
      "Beats Studio3 Wireless Noise Cancelling Over-Ear Headphones - Apple W1 Headphone Chip, Class 1 Bluetooth, 22 Hours of Listening Time, Built-in Microphone - Shadow Gray (Latest Model)",
    price: "199.00",
    rating: "3",
    image: headphones,
    id:'i3'
  },
  {
    description:
      "WD 5TB Elements Portable External Hard Drive HDD, USB 3.0, Compatible with PC, Mac, PS4 & Xbox - WDBU6Y0050BBK-WESN",
    price: "99.99",
    rating: "5",
    image: wdhd,
    id:'i4'
  }
  // ,
  // { description: "", price: "", rating: "", image: "" },
  // { description: "", price: "", rating: "", image: "" },
  // { description: "", price: "", rating: "", image: "" },
  // { description: "", price: "", rating: "", image: "" },
  // { description: "", price: "", rating: "", image: "" },
  // { description: "", price: "", rating: "", image: "" },
];

const Home = () => {
  return (
    <div>
      <img className={classes.background} src={unsplash} alt="background" />
      <ul className={classes.ul}>
        {
          DUMMY_ITEMS.map(item => {
            return <ItemCard key={item.id} item={item}></ItemCard>
          })
        }
      </ul>
    </div>
  );
};

export default Home;
