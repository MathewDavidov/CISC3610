"use strict";

// Define all properties and constants in the central object
const Data = {
  canvas: undefined,
  canvas2: undefined,
  ctx: undefined,
  ctx2: undefined,
};

/**
 * Initial function to derive canvas element, context, and call the execute function
 */
const start = () => {
  Data.canvas = document.getElementById("canvas");
  Data.ctx = Data.canvas.getContext("2d");

  Data.canvas2 = document.getElementById("canvas2");
  Data.ctx2 = Data.canvas2.getContext("2d");

  execute();
};

document.addEventListener("DOMContentLoaded", start);

/**
 * Central function that draws the two types of charts
 * SOURCE: https://data.cityofnewyork.us/Education/2012-SAT-Results/f9bf-2cp4
 */
const execute = () => {
  const SATBarChart = new Chart(Data.ctx, {
    type: "bar",
    data: {
      labels: [
        "HENRY STREET SCHOOL FOR INTERNATIONAL STUDIES",
        "UNIVERSITY NEIGHBORHOOD HIGH SCHOOL",
        "EAST SIDE COMMUNITY SCHOOL",
        "FORSYTH SATELLITE ACADEMY",
        "MARTA VALLE HIGH SCHOOL",
        "LOWER EAST SIDE PREPARATORY HIGH SCHOOL",
        "NEW EXPLORATIONS INTO SCIENCE, TECHNOLOGY AND MATH HIGH SCHOOL",
        "CASCADES HIGH SCHOOL",
        "BARD HIGH SCHOOL EARLY COLLEGE",
        "47 THE AMERICAN SIGN LANGUAGE AND ENGLISH SECONDARY SCHOOL",
      ],
      datasets: [
        {
          label: "SAT MATH Average Score",
          data: [404, 423, 402, 401, 433, 557, 574, 418, 604, 400],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(165, 42, 42, 0.2)",
            "rgba(0, 255, 0, 0.2)",
            "rgba(255, 182, 193, 0.2)",
            "rgba(0, 0, 139, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(165, 42, 42, 1)",
            "rgba(0, 255, 0, 1)",
            "rgba(255, 182, 193, 1)",
            "rgba(0, 0, 139, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      title: {
        display: true,
        text: "Mathew Davidov",
      },
    },
  });

  const SATRadarChart = new Chart(Data.ctx2, {
    type: "polarArea",
    data: {
      labels: [
        "HENRY STREET SCHOOL FOR INTERNATIONAL STUDIES",
        "UNIVERSITY NEIGHBORHOOD HIGH SCHOOL",
        "EAST SIDE COMMUNITY SCHOOL",
        "FORSYTH SATELLITE ACADEMY",
        "MARTA VALLE HIGH SCHOOL",
        "LOWER EAST SIDE PREPARATORY HIGH SCHOOL",
        "NEW EXPLORATIONS INTO SCIENCE, TECHNOLOGY AND MATH HIGH SCHOOL",
        "CASCADES HIGH SCHOOL",
        "BARD HIGH SCHOOL EARLY COLLEGE",
        "47 THE AMERICAN SIGN LANGUAGE AND ENGLISH SECONDARY SCHOOL",
      ],
      datasets: [
        {
          label: "SAT MATH Average Score",
          data: [404, 423, 402, 401, 433, 557, 574, 418, 604, 400],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(165, 42, 42, 0.2)",
            "rgba(0, 255, 0, 0.2)",
            "rgba(255, 182, 193, 0.2)",
            "rgba(0, 0, 139, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(165, 42, 42, 1)",
            "rgba(0, 255, 0, 1)",
            "rgba(255, 182, 193, 1)",
            "rgba(0, 0, 139, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      title: {
        display: true,
        text: "Mathew Davidov",
      },
    },
  });
};
