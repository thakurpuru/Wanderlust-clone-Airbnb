const url="http://localhost:8080"

const AllListing=async()=>{

    try{
        const res= await fetch(`${url}/listing`);
        const data=await res.json();
    
    
        let card_grid=document.querySelector(".ab-cards-grid");
        card_grid.innerHTML="";
        data.forEach(element => {
            let card=document.createElement("div");
            card.classList.add("ab-card");
            card.innerHTML=`
            <div class="ab-image-container">
                        <img src=${element.image.url} alt="Mountain Retreat">
                    </div>
                    <div class="ab-card-content">
                        <p class="ab-title">${element.title}</p>
                        <p class="ab-price">${element.price.toLocaleString("en-IN")}/night</p>
                    </div>
            `;
            card_grid.appendChild(card);
            
    
            
        });

    }catch(err){
        console.log("Error in fetching in listing",err);
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    AllListing();
});