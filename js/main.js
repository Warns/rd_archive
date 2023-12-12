
var main = {
    init: function(){
        this.activate();
    },

    activate: function(){
        for(i in this.actions){
            this.actions[i]();
        }
    },

    actions:{
        aya: function(){
            let url = "https://api.alquran.cloud/v1/ayah/";
            let ayas = document.querySelectorAll("div.aya");

            for( let i=0; i<ayas.length; ++i ){
                let aya = ayas[i].getAttribute("data-number");
                
                let aa = aya.split(":");
                
                main.load(url + aya, 
                    function(result){
                        let data = JSON.parse(result).data;
                        
                        let html = `
                            <div class="ar">${data.text}
                            <a target="blank" href="http://elktb.net/A/${aa[0]}/${aa[1]}">▲</a>
                            </div>
                            <ul>
                                <li>${data.surah.englishName}</li>
                                <li>${data.surah.number} / ${data.numberInSurah}</li>
                                <li class="ar">${data.surah.name}</li>
                            </ul>
                        `;

                        ayas[i].innerHTML = html;

                    },
                    function(error){
                        console.log(error);
                    }
                )
            }
        },

        sidebar: function(){
            let sidebar = document.querySelector(".entry-sidebar-inside");
            let ul = document.createElement("ul");
            let title = document.createElement("span");

            if(sidebar){
                let Hs = document.querySelectorAll(".wp-block-heading");
                if(Hs.length > 0){
                    for(var i=0; i<Hs.length; ++i){
                        let h = Hs[i];
                        console.log(h.tagName);
                        h.setAttribute("id", "section-"+i);

                        let li = document.createElement("li");
                            li.setAttribute("class", h.tagName);
                        li.innerHTML = `<a href="#section-${i}">${h.innerHTML}</a>`;

                        ul.appendChild(li);
                    }
                    title.innerText = "İÇİNDEKİLER";
                    sidebar.appendChild(title);
                    sidebar.appendChild(ul);
                }
                
            }
        }
    },

    load: function (url, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.al
        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              if (success) success(xhr.responseText);
            } else {
              if (error) error(xhr);
            }
          }
        };
        xhr.open("GET", url, true);
        xhr.send();
    },
}

main.init();