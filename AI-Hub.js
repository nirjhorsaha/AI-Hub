let allHubs = [];

// show all button
const showALL = document.getElementById("show-all");

const loadMyData = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();

  let sliceData = data.data.tools.slice(0, 6);
  
  showAllData(sliceData);
  allHubs = data.data.tools;
  // console.log(data.data.tools);
};


const showAllData = (hubs) => {
  // console.log(hubs);
  const hubContainer = document.getElementById("main-container");
  hubContainer.innerHTML = "";
  hubs.forEach((hub) => {
    // console.log(hub.id);
    (hub.id > 6) ?
      showALL.classList.add("d-none") : showALL.classList.remove("d-none");
    
    // if (hub.id > 6) {
    //   showALL.classList.add("d-none");
    // } else {
    //   showALL.classList.remove("d-none");
    // }

    const hubDiv = document.createElement("div");
    hubDiv.classList.add("col");
    hubDiv.innerHTML = `
        <div class="card h-100 shadow p-2 bg-body rounded">
            <img src="${hub.image}"class="card-img-top p-3 " alt="...">
                <div class="card-body">
                    <h5 id="feature-title" class="card-title">Featured</h5>
                        <ul id="feature-list" class="list-group list-group-numbered">
                        ${
                          hub.features
                            ? hub.features
                                .map((x) => {
                                  return `<li>${x}</li>`;
                                })
                                .join("")
                            : "No Feature Found"
                        }
                        </ul>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center">                            
                            <div>
                                <h5 id="hub-title" class="card-title"> ${hub.name}</h5>
                                <p id="date"><i class="fa-solid fa-calendar-days"></i> ${
                                  hub.published_in
                                }</p>
                            </div>
                        <div>
                            <button onClick="showSingleHub('${
                              hub.id
                            }')" class="border-0 rounded-circle" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <i class="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                </div>
        </div>
    `;
    hubContainer.appendChild(hubDiv);
  });
};

// show all hub
const showAllHub = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  showAllData(data.data.tools);
};

const loader = document.getElementById("loader");
window.addEventListener("load", function () {
  loader.style.display = "none";
});

// get single hub info using dynamic URL and unique id
const showSingleHub = async (id) => {
  const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(URL);
  const data = await res.json();
  // console.log(data.data.integrations);

  // show single hub info in modal using dynamic URL and unique id
  const hubDetails = document.getElementById("modal-detail");
  hubDetails.innerHTML = `
      <div class="container-fluid">
        <div class="row text-center ">
            <div class="col-md-6 ">
                <div class="card container-fluid mw-100 left-box">
                    <div class="card-body container-fluid">
                        <h5 id="desc" class="card-title">${
                          data.data.description ? data.data.description : "NO Description.!"
                        }</h5>
                        <div class="mt-4">
                            <div class=" container px-2">
                                <div class="row gx-2 ">
                                    <div class="col-md-4">
                                        <div class="p-2 border bg-light">
                                            <p class="first">${
                                              data.data.pricing
                                                ? data.data.pricing[0].price
                                                : "Free of cost/"
                                            } <br>
                                                ${
                                                  data.data.pricing
                                                    ? data.data.pricing[0].plan
                                                    : "Basic"
                                                }
                                                </p>
                                        </div>
                                    </div>
    
                                    <div class="col-md-4">
                                        <div class="p-2 border bg-light">
                                            <p class="second">
                                            ${
                                              data.data.pricing
                                                ? data.data.pricing[1].price
                                                : "Free of cost/"
                                            } <br> 
                                            ${data.data.pricing 
                                              ? data.data.pricing[1].plan : "Pro"
                                          }
                                          </p>
                                        </div>
                                    </div>
    
                                    <div class="col-md-4">
                                        <div class="p-2 border bg-light">
                                            <p class="third">
                                            ${
                                              data.data.pricing
                                                ? data.data.pricing[2].price
                                                : "Free of cost/"
                                            } <br> 
                                            ${
                                              data.data.pricing
                                                ? data.data.pricing[2].plan
                                                : "Enterprise"
                                            }
                                              </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="my-4">
                                <div class=" container px-2">
                                    <div class="row gx-2">
                                        <div class="col-md-6">
                                            <div class=" border bg-light text-start p-2">
                                                <h3 class="ms-2 ">Features</h3>
                                                <ol id="card-list">
                                                ${
                                                  data.data.features
                                                    ? Object.values(data.data.features)
                                                        .map((x) => {
                                                          console.log(x);
                                                          return `<li>${x.feature_name}</li>`;
                                                        })
                                                        .join("")
                                                    : "No Data Found.!"
                                                }
                                                </ol>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="border bg-light text-start p-2">
                                                <h3 class="text-start ms-2 ">Integration</h3>
                                                <ol id="card-list">
                                                ${
                                                  data.data.integrations
                                                    ? data.data.integrations
                                                        .map((x) => {
                                                          return `<li>${x}</li>`;
                                                        })
                                                        .join("")
                                                    : "No Data Found.!"
                                                }
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p class="card-text"></p>
                    </div>
                </div>
            </div>
            <div class="col-md-6 right-box">
                <div class="card container-fluid mw-100">
                    <div class="position-relative">
                        <img class="img-fluid p-2 " src="${
                          data.data.image_link[0] ? data.data.image_link[0] : "NO Image Found"
                        }" class="card-img-top " alt="...">
                        
                        <button id="accuracy-btn" type="button"
                            class="btn btn-danger mx-2 my-2 modal-btn position-absolute top-0 end-0 "><span id="accuracy"></span>%
                            Accuracy
                        </button>
                    </div>
                    <div class="card-body">
                        <h5 class="input">${
                          data.data.input_output_examples
                            ? data.data.input_output_examples[0].input
                            : "Hello World"
                        }</h5>
                        <p class="output">${
                          data.data.input_output_examples
                            ? data.data.input_output_examples[0].output
                            : "Take a break!!"
                        }</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `;

  // accuracy  show and validation
  const accuracyBtn = document.getElementById("accuracy");
  accuracyBtn.innerText = data.data.accuracy.score * 100;

  const accuracySection = document.getElementById("accuracy-btn");
  if (typeof data.data.accuracy.score !== "number") {
    accuracySection.classList.add("d-none");
  } else {
    accuracySection.classList.remove("d-none");
  }
};

// item sort
document.getElementById("sort-btn").addEventListener("click", function () {
  // console.log(allHubs);
  allHubs.sort((a, b) => {
    // console.log(a.published_in, b.published_in);
    return new Date(a.published_in) < new Date(b.published_in) ? 1 : -1;
  })
  showAllData(allHubs);
  showALL.classList.add("d-none");
});

loadMyData();

