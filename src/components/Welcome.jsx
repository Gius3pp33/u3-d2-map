import React from "react";
import { Alert } from "react-bootstrap";


const Welcome = () => {
    return(
        <div className="mt-5">
      <Alert variant="warning">
        <Alert.Heading>Welcome to My Book Shop</Alert.Heading>
        <p>Enjoy this books!</p>
      </Alert>
    </div>
    );
};
export default Welcome;