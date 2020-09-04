import 'bootstrap';
import './css/style.css';
import './favicon.png';
import 'bootstrap/dist/css/bootstrap.min.css';

import {checkStorage, listOrder, fixData, saveToIndexedDB, getAllIndexedDb} from'./js/back-end.js';

/**
 * Page Reload this Script runing
 */
document.addEventListener('DOMContentLoaded', () => {
    checkStorage();
    var page = window.location.hash.substr(1);
    if (page == '') {
      return;
    } else {
      window.location.href ='/'
    }
    loadPage(page);

})

/**
 * Button ADD clicked this function runing
 */
document.getElementById('add').addEventListener('click', ()=> {
    const nameItem =document.getElementById('nameItem').value;
    const totalItem = document.getElementById('totalItem').value;
    const price = document.getElementById('price').value;    
    
    //validate input
    if((nameItem || totalItem || price) == "" ){
        document.querySelector('.alert-danger').style.display = "block";
        return;
    } else {
        listOrder(nameItem, totalItem, price);    
        document.querySelector('.alert-danger').style.display = "none";
    } 
    
    //add repository data to page
    console.log(fixData);
    let repo = '';
    fixData.forEach( result => {
        repo += `
            <tr>
                    <td>${result.nameItem}</td>
                    <td>${converseRupiah(result.price)}</td>
                    <td>${result.totalItem}</td>
                    <td id="totalPrice">${result.totalItem * result.price}</td>
            </tr>
            `;
    });
    document.querySelector('.table-body').innerHTML = repo;
    
    var table = document.getElementById("table"), sumVal = 0;
            for(var i = 1; i < table.rows.length; i++){
                sumVal = sumVal + parseInt(table.rows[i].cells[3].innerHTML);
            }
           document.getElementById("total-pricing").innerHTML = converseRupiah(sumVal);      
           const jumlah = sumVal.toString().replace(/[.](?=.*?\.)/g, '');
           //clearing field
    clear();
});

/**
 * button Finish Order this Script Running
 */
document.getElementById('finish-order').addEventListener('click', () => {
  if( fixData == '' ){
    document.querySelector('.alert-danger').style.display = "block";
    return;
} else {    
  saveToIndexedDB();
  document.querySelector('.alert-danger').style.display = "none";
} 
   
})

/**
 * button History onclick this Scrip running
 */
document.getElementById('transaction-history').addEventListener('click', () => {
  setTimeout(() => {
    var page = window.location.hash.substr(1);
    loadPage(page);  
    
    const data_history = getAllIndexedDb();
    
    let table_history= "";
    let i = 1;
    data_history.then( data =>{  
      
      data.forEach( result => {
        let table = "";
        result.forEach( list => {
          table +=`
          <tr>
                    <td>${list.nameItem}</td>
                    <td>${list.price}</td>
                    <td>${list.totalItem}</td>
                    <td id="totalPrice">${list.totalItem * list.price}</td>
            </tr>
          `;
        })
        table_history += `
        <div class="card">
            
        <div class="card-body">
          <h5 class="card-title text-center">AiryPay Indonesia</h5>
          <p class="card-text">transaction :${i} </div>
            <table class="table" id="table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Lots</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody class="table-body">
               <!-- foreach item -->
               ${table}
              </tbody>
            </table>
        
      </div>
        `;
        i++
      })
    })
  
    setTimeout(() => {
      const pick = document.getElementById('history');
      if (table_history == '') {
        pick.innerHTML ="Tidak Ada Data untuk Di tampilkan";
      } else {
        pick.innerHTML = table_history;
      }
      
    }, 100);
    
  }, 50);


});

/**
 * function in this FILE
 */
function clear(){
    document.getElementById('nameItem').value = '';
    document.getElementById('totalItem').value = '';
    document.getElementById('price').value = '';
}

function converseRupiah(angka){
    var reverse = angka.toString().split('').reverse().join(''),
    ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
}

function loadPage(page){
    setTimeout(() => {
      var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          var content = document.querySelector("#history-content");
          if (this.status == 200) {
            content.innerHTML = xhttp.responseText;
          } else if (this.status == 404) {
            content.innerHTML = `<div style="margin:1em;" class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Check Your URL </strong> please make sure is Valid URL.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
          } else {
            content.innerHTML = `<div style="margin:1em;" class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Check Your URL </strong> please make sure is Valid URL.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
          }
        }
      };
    xhttp.open('GET','pages/'+page+".html", true);
    xhttp.send();  
    }, 50);

        
}



