const keys = require("../../config/keys");
module.exports = (survey) => {
  return `
    <html>
      <body style="height:30vh;width:60vw;background-color:MediumSeaGreen;padding:5vh">
        <div style="text-align: center;">
          <h3>Help us to make your tomorrow better</h3>
          <p>Please answer the following question:</p>
          <p>${survey.body}</p>
          <div style="display:flex;flex-direction:column;padding-left:20vw;padding-right:20vw">
            <div style="height:4vh;width:10vw;background-color:white;justify-content:center"><a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a></div>
            <div style="height:4vh;width:10vw;background-color:white;justify-content:center"><a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a></div>
          </div>
        </div>
      </body>
    </html>
  `;
};
