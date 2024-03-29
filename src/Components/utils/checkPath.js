//Give the function a path and it'll return a matching 
//hub id (unique) or if the path is missing (not established).
export default function checkPath(props,path) { //e.g. 2, 'programming/javascript/react'
  let state = props.state || {}
  let tags = state.tags || [];
  let hubLinks = state.hubLinks || [];
  let hubTags = state.hubTags || [];
  let missingPath = false;
  if (path === '/') {
    return {currentHub: 1, missingPath, subs: {}}
  }
  let path2 = path.slice(1);

  if (!path2.includes('/')) { //single path // e.g. programming
    return processSinglePath(props,path2,tags,hubTags,hubLinks)
  }
  else { //multiple paths. e.g. programming/javascript/react OR a trailing slash.
    let checkPath = path.split('/');
    let newPath = [];
    if (checkPath.includes('')) { // includes a trailing slash somewhere, probably at the end.
      newPath = checkPath.filter(item => item !== '');
      if (newPath.length === 1) {
        return processSinglePath(props,newPath[0],tags,hubTags,hubLinks);
      }
    }

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

function processSinglePath(props,path,tags,hubTags,hubLinks) { //'programming' 
  let fullTag = tags.find(tag => { // ----> {name: 'programming', id: 2}
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
        return {currentHub: linkPotentials[j].sub_hub, missingPath: false, subs: [fullTag.name]}
      }
    }
  }
  return {currentHub: 1, missingPath: true}
}