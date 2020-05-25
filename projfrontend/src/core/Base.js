import React from "react";
import NavigationBar from "./NavigationBar";

const Base = ({
  title = "My title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <div>
      <NavigationBar />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center">
          <h4>Contast us @</h4>
          <button className="btn btn-warning btn=lg">Contact</button>
        </div>
        <div>
          <span>
            The best <span className="text-white">merch store</span> ever
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
