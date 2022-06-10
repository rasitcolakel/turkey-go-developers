import axios from "axios";
export default async function getDevelopers(req, res) {
  try {
    const { method } = req;
    const readme = await axios.get(
      "https://raw.githubusercontent.com/yakuter/go-developer-list/main/README.md"
    );
    // const [, name, company, socialMedia, description, workStatus] = d;

    let developers = readme.data.split(/\|\s[0-9]{1,6}/);
    developers = developers.slice(1, developers.length);
    developers = developers.map((developer) => {
      let [, name, company, socialMedia, description, workStatus] =
        developer.split(" |");
      let links = [];
      let mails = [];
      let linkRegex =
        /(http|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g;
      let emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;

      if (socialMedia) {
        let socialLinks = socialMedia.match(linkRegex);
        let socialMails = socialMedia.match(emailRegex);

        if (socialLinks) {
          links = links.concat(socialLinks);
          socialMedia = socialMedia.replace(linkRegex, "");
        }
        if (socialMails) {
          mails = mails.concat(socialMails);
          socialMedia = socialMedia.replace(emailRegex, "");
        }
      }

      if (description) {
        let descLinks = description.match(linkRegex);
        let descMails = description.match(emailRegex);

        if (descLinks) {
          links = links.concat(descLinks);
          description = description.replace(linkRegex, "");
        }
        if (descMails) {
          mails = mails.concat(descMails);
          description = description.replace(emailRegex, "");
        }
      }

      return {
        name: name?.trim() || "",
        company: company?.trim() || "",
        socialMedia: socialMedia?.trim(),
        description: description?.trim() || "",
        workStatus: workStatus?.trim() || "",
        connections: [...mails, ...links],
      };
    });
    if (method === "GET") {
      res.setHeader("Cache-Control", "s-maxage=30");
      res.status(200).json(developers.filter((d) => d.name));
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    res.status(500).end(`Server error`, err.message);
    console.log(err);
  }
}
