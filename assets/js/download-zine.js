const { PDFDocument, StandardFonts, rgb, PDFName, PDFArray } = PDFLib;

var headers = [];
var stories = [];
var links = {};
const file_names = ['title_contents', 'platonic_title', 'romantic_title']
var y = 700;
var titleSize = 20;
var fontSize = 16;


const checkboxes = document.querySelectorAll("input[type='checkbox']");
const platonic_check = document.getElementById('fic1');
const romantic_check = [].slice.call(checkboxes).splice(1)

const createPageLinkAnnotation = (pdfDoc, pageRef, x, y, height, width) =>
  pdfDoc.context.register(
    pdfDoc.context.obj({
      Type: 'Annot',
      Subtype: 'Link',
      /* Bounds of the link on the page */
      Rect: [
        x, // lower left x coord
        y+height, // lower left y coord
        x+width, // upper right x coord
        y, // upper right y coord
      ],
      /* Give the link a 2-unit-wide border, with sharp corners */
      Border: [0, 0, 2],
      /* Make the border color blue: rgb(0, 0, 1) */
      C: [0, 0, 1],
      /* Page to be visited when the link is clicked */
      Dest: [pageRef, 'XYZ', 0, 792, null],
    }),
  );

(async function() {
  var url, existingPdfBytes, pdfDoc;

  for (file_name of file_names) {
    url = '/assets/fics/'+file_name+'.pdf';
    // console.log(url);
    existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
    pdfDoc = await PDFDocument.load(existingPdfBytes);
    headers.push(pdfDoc);
  }
})()

function isOneChecked(inputs) {
  var checked = false;
  inputs.forEach( (input) => {
    if (input.checked) {
      checked = true;
    };
  });
  return checked;
}

async function downloadPDF() {
  y = 700;
  const verdanaBytes = await fetch("/assets/fonts/Verdana.ttf").then(res => res.arrayBuffer());
  // const verdanaItalicsBytes = await fetch("/assets/fonts/Verdana_italic.ttf").then(res => res.arrayBuffer());
  const didotBytes = await fetch("/assets/fonts/Didot.ttf").then(res => res.arrayBuffer());

  var story, length;
  var firstPage, copiedPages;
  var stories = document.querySelectorAll("input[type='checkbox']:checked");
  var romantics = platonic_check.checked ? [].slice.call(stories).slice(1) : stories;
  // console.log(romantics);
  // console.log(platonic_check);
  // console.log(headers);

  var download = await PDFDocument.create();
  copiedPages = await download.copyPages(headers[0], headers[0].getPageIndices());
  copiedPages.forEach((page) => download.addPage(page));
  download.registerFontkit(fontkit);
  var verdana = await download.embedFont(verdanaBytes);
  var didot = await download.embedFont(didotBytes);

  var content = download.addPage([612, 792]);
  // var content = download.getPage(1);
  var links = [];
  var pageNum;
  // await checkStories();
  // console.log(stories);

  if (platonic_check.checked) {
    console.log('platonic stories');
    length = download.getPages().length;
    content.moveTo(72,y);
    content.drawText('Platonic', {
      size: titleSize,
      font: didot
    });
    copiedPages = await download.copyPages(headers[1], headers[1].getPageIndices());
    const [firstPage] = copiedPages;
    download.addPage(firstPage);

    const ptitle = download.getPage(length);
    links.push(createPageLinkAnnotation(download, ptitle.ref, 72, y, 20, didot.widthOfTextAtSize('Platonic', 20)));
    y = y - titleSize - 5;

    story = await getStory(stories[0]);
    // console.log(story);
    content.moveTo(90,y);
    content.drawText('Kunimi Akira is NOT a Boy', {
      size: 16,
      font: didot
    });
    pageNum = '3'
    content.moveTo(540-didot.widthOfTextAtSize(pageNum, 16),y);
    content.drawText(pageNum, {
      size: 16,
      font: didot
    });
    var currentPage = length;
    copiedPages = await download.copyPages(story, story.getPageIndices());
    copiedPages.forEach((page) => {
      ++currentPage;
      var string = '' + currentPage;
      download.addPage(page);
      page.moveTo(306-(didot.widthOfTextAtSize(string, 12)/2),20);
      page.drawText(string, {
        size: 12,
        font: didot,
        color: rgb(1,1,1)
      });
    });
    links.push(createPageLinkAnnotation(download, download.getPage(length+1).ref, 90, y, 16, 450));
    y = y - fontSize - 5;

    y = y - titleSize;

  }

  if (isOneChecked(romantic_check)) {
    length = download.getPages().length;
    // console.log(length);
    console.log('romantic stories')
    content.moveTo(72,y);
    content.drawText('Romantic', {
      size: titleSize,
      font: didot
    });
    copiedPages = await download.copyPages(headers[2], headers[2].getPageIndices());
    copiedPages.forEach((page) => download.addPage(page));
    // console.log(length);
    const rtitle = download.getPage(length);
    const link2 = createPageLinkAnnotation(download, rtitle.ref, 72, y, 20, didot.widthOfTextAtSize('Romantic', 20));
    links.push(link2);

    y = y - titleSize - 5;

    for (input of romantics) {
      length = download.getPages().length;
      // console.log(length);
      var title = input.value;
      story = await getStory(input);
      content.moveTo(90,y);
      content.drawText(title, {
        size: 16,
        font: didot
      });
      pageNum = '' + (length + 1);
      content.moveTo(540-didot.widthOfTextAtSize(pageNum, 16),y);
      content.drawText(pageNum, {
        size: 16,
        font: didot
      });
      var currentPage = length;
      copiedPages = await download.copyPages(story, story.getPageIndices());
      copiedPages.forEach((page) => {
        ++currentPage;
        var string = '' + currentPage;
        download.addPage(page);
        page.moveTo(306-(didot.widthOfTextAtSize(string, 12)/2),20);
        page.drawText(string, {
          size: 12,
          font: didot,
          color: rgb(1,1,1)
        });
      });
      links.push(createPageLinkAnnotation(download, download.getPage(length).ref, 90, y, 16, 450));
      y = y - fontSize - 5;
    }
      
  }

  content.node.set(PDFName.of('Annots'), download.context.obj(links));


  var bytes = await download.save();
  savePDF(bytes);

  // copiedPages = await download.copyPages(story, story.getPageIndices());
  // copiedPages.forEach((page) => download.addPage(page));


}

function savePDF(bytes) {
  var blob= new Blob([bytes], {type: "application/pdf"});
  var link=document.createElement('a');
  link.href=window.URL.createObjectURL(blob);
  link.download="mimi digizine test.pdf";
  link.click();
}

async function checkStories() {
  await document.querySelectorAll("input[type='checkbox']:checked").forEach(addStory);
}

async function addStory(data) {
  if (data.checked) {
    var file_name = data.value;
    var url, existingPdfBytes, pdfDoc;
    url = '/assets/fics/'+file_name+'.pdf';
    existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
    pdfDoc = await PDFDocument.load(existingPdfBytes);
    stories.push(pdfDoc);
  }
}

async function getStory(data) {
  if (data.checked) {
    var file_name = data.value;
    var url, existingPdfBytes, pdfDoc;
    url = '/assets/fics/'+file_name+'.pdf';
    existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
    pdfDoc = await PDFDocument.load(existingPdfBytes);
    return pdfDoc;
  }
}
