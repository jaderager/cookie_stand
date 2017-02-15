/*  For personal reference, not meant to be used in web page or graded. See README.md   */

/*  WILL NOT WORK IF NODE PASSED DIRECTLY TO, USE ID INSTEAD
    Used to recursively add elements.
    Tightly coupled with Store objects, only a wrapper function.  */
function generateSalesOutput (target, objIndex) { //takes wrapper as argument, and salesOutputArray to repetitively add li elements
  console.log('FUNCTION_EXECUTE insertUlLiIter()');

  var targetSectionNodeObj = document.getElementById(target);
  var targetUlNodeObj;

  for (var i = 0; i < objIndex.length; i++) {

    insertNodeWithText(targetSectionNodeObj, 'h1', objIndex[i].locString);
    targetUlNodeObj = insertNode(targetSectionNodeObj, 'ul'); //not only append ul element to targetNodeObj, but pass its new child node(HTML Obj) to targetUl for future appending to

    for (var j = 0; j < objIndex[i].salesOutputArray.length; j++) {

      insertNodeWithText(targetUlNodeObj, 'li', objIndex[i].salesOutputArray[j]);

    }
  }
  console.log('FUNCTION_BREAK insertUlLiIter()');
}