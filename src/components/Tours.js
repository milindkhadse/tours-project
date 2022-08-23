import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Tours({ tours }) {
  const [readMore, setreadMore] = useState(false);
  return tours.map((tour) => {
    const { id, name, info, image, price } = tour;
    return (
      <Card key={id} sx={{ mb: 4 }}>
        <CardMedia component="img" image={image} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {price}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {readMore ? info : `${info.substring(0, 200)}...`}
            <Button variant="text" onClick={() => setreadMore(!readMore)}>
              {readMore ? "Show less" : "Read more"}
            </Button>
          </Typography>
        </CardContent>
      </Card>
    );
  });
}
