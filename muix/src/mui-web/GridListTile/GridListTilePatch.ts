import { classNamesStr } from 'reactxx-basic'

export const fitPatch = () => {
  const imgElement = this.imgElement

  if (!imgElement || !imgElement.complete) return

  if (
    imgElement.width / imgElement.height >
    imgElement.parentNode.offsetWidth / imgElement.parentNode.offsetHeight
  ) {
    imgElement.classList.remove(
      ...classNamesStr(this.props.classes.imgFullWidth).split(" ")
    );
    imgElement.classList.add(...classNamesStr(this.props.classes.imgFullHeight).split(" "));
  } else {
    imgElement.classList.remove(
      ...classNamesStr(this.props.classes.imgFullHeight).split(" ")
    );
    imgElement.classList.add(...classNamesStr(this.props.classes.imgFullWidth).split(" "));
  }

  imgElement.removeEventListener("load", this.fit);

}