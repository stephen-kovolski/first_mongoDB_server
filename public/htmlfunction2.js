function createInitalElements () {
    
    const avlDiv = document.createElement('div'),
          rntDiv = document.createElement('div'),
          avlBtn = document.createElement('button'),
          rntBtn = document.createElement('button'),
          randomBtn = document.createElement('button');
  
      avlDiv.id = 'avldiv';
      rntDiv.id = 'rntdiv';
      avlBtn.id = 'avlbtn';
      rntBtn.id = 'rntbtn';
      randomBtn.id = 'testbtn';
      avlBtn.innerText = 'See Movie Choices';
      rntBtn.innerText = 'See What Others Are Watching Now';
      randomBtn.innerText = 'testing'
      avlBtn.onclick = createAvlDsply;
      rntBtn.onclick = createRntDsply;
      randomBtn.onclick = rentRandomMov;
      avlDiv.style.backgroundColor = 'pink';
      rntDiv.style.backgroundColor = 'lightgreen';
      avlDiv.style.textAlign = 'center';
      document.body.appendChild(avlDiv);
      document.body.appendChild(avlBtn);
      document.body.appendChild(rntDiv);
      document.body.appendChild(rntBtn);
      document.body.appendChild(randomBtn);