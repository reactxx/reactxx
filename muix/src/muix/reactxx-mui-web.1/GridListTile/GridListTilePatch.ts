import { classNamesStr } from 'reactxx-basic'

export const fitPatch = (self) => {
  const imgElement = self.imgElement

  if (!imgElement || !imgElement.complete) return

  if (
    imgElement.width / imgElement.height >
    imgElement.parentNode.offsetWidth / imgElement.parentNode.offsetHeight
  ) {
    imgElement.classList.remove(
      ...classNamesStr(self.props.classes.imgFullWidth).split(" ")
    );
    imgElement.classList.add(...classNamesStr(self.props.classes.imgFullHeight).split(" "));
  } else {
    imgElement.classList.remove(
      ...classNamesStr(self.props.classes.imgFullHeight).split(" ")
    );
    imgElement.classList.add(...classNamesStr(self.props.classes.imgFullWidth).split(" "));
  }

  imgElement.removeEventListener("load", self.fit);

}