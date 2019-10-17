//Give the function a path and it'll return a matching 
//hub id (unique) or if the path is missing (not established).
export default function checkPath(props,path) { //e.g. 2, 'programming/javascript/react'
  let state = props.state || {}
  let tags = state.tags || [];
  let hubLinks = state.hubLinks || [];
  let hubTags = state.hubTags || [];
  let missingPath = false;
  if (path === '/') {
    return {currentHub: 1, missingPath}
  }
  path = path.slice(1);

  if (!path.includes('/')) { //single path // e.g. programming
    let fullTag = tags.find(tag => {
      if (tag.name) {
        return tag.name.toLowerCase() === path.toLowerCase()
      }
    });
    if (!fullTag) { 
      return {currentHub: 1, missingPath: true}
    }
    //Check the path and make sure it's valid.

    let tagPotentials = hubTags.filter(hub => hub.tag_id === fullTag.id);
    let linkPotentials = hubLinks.filter(hub => hub.hub_id === 1); 
    for (let i=0;i<tagPotentials.length;i++) {
      for (let j=0; j<linkPotentials.length;j++) {
        if (tagPotentials[i].hub_id === linkPotentials[j].sub_hub) {
          return {currentHub: linkPotentials[j].sub_hub, missingPath: false}
        }
      }
    }
    return {currentHub: 1, missingPath: true}
  }
  else { //multiple paths. e.g. programming/javascript/react
    let newPath = path.split('/');
    let previousPath = 1; // start at home
    for (let i=0;i<newPath.length;i++) {
      let newestPath = previousPath;
      if (previousPath === 1 && i !== 0) {
        return {currentHub: 1, missingPath: true}
      }
      let fullTag = tags.find(tag => {
        if (tag.name) {
          return tag.name.toLowerCase() === newPath[i].toLowerCase()
        }
      });
      if (!fullTag) { 
        return {currentHub: 1, missingPath: true}
      }

      let tagPotentials = hubTags.filter(hub => hub.tag_id === fullTag.id);
      let linkPotentials = hubLinks.filter(hub=> hub.hub_id === previousPath);

      for (let j=0;j<tagPotentials.length;j++) {
        for (let k=0; k<linkPotentials.length;k++) {
          if (tagPotentials[j].hub_id === linkPotentials[k].sub_hub) {
            previousPath = linkPotentials[k].sub_hub;
          }
        }
        if ((j===tagPotentials.length-1) && (previousPath === newestPath)) {
        return {currentHub: 1, missingPath: true}
        }
      } 
      if (previousPath === 1) { 
        return {currentHub: 1, missingPath: true}
      }
    }
    return {currentHub: previousPath, missingPath: false}
  }
}