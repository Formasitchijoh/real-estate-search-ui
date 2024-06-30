import toast from "react-hot-toast";


export const successnotify = () =>
    toast.success("Item Bookmarked successfully.", {
      duration: 4000,
      position: "top-center",
      // Custom Icon
      icon: "👏",

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },

      // Aria
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
export const errornotify = () =>
    toast.error("Please login to make a bookmark.", {
      duration: 4000,
      position: "top-center",
      // Custom Icon
      icon: "👏",

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },

      // Aria
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });