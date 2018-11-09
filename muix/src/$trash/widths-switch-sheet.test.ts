import { TVariants } from "reactxx-typings";
import { atomizeSheet } from "reactxx-sheeter";
import { initPlatform, Shape, ts } from "reactxx-tests";
export const createSheet = () =>
  (ts.sheet = {
    root: (ts.view = {
      $widths: {
        ['0-640']: {
          margin: 0,
          $switch: {
            isClosed: {
              backgroundColor: "gray"
            }
          }
        },
        ['640-1024']: {
          margin: 10
        },
        ['1024-']: {
          margin: 20
        }
      },
    }),
    label: {},
    webOnly: {},
    nativeOnly: {}
  });
export const query = (isMobile: boolean) =>
  ({
    $widths: {
      mobileWidth: isMobile,
      tabletWidth: !isMobile,
    }
  } as TVariants.Query<Shape>);
describe("WIDTHS+SWITCH define sheet", () => {
  it("WEB", () => {
    initPlatform(true);
    const sheet = atomizeSheet<Shape>(createSheet());
    expect(sheet).toMatchSnapshot();
  });
  it("NATIVE", () => {
    initPlatform(false);
    const sheet = atomizeSheet<Shape>(createSheet());
    expect(sheet).toMatchSnapshot();
  });
});
