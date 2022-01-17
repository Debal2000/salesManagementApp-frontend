export function getBucket(data, index) {
    let row = document.getElementById(index + "bucket");
    let age = data.predictions;
    if (age < 15) row.innerHTML = "0-15 days";
    else if (age < 30) row.innerHTML = "16-30 days";
    else if (age < 45) row.innerHTML = "31-45 days";
    else if (age < 60) row.innerHTML = "45-60 days";
    else row.innerHTML = "Greater than 60 days";
  }