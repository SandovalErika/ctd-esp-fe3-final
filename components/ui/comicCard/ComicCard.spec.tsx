// import { render, fireEvent, screen } from "@testing-library/react";
// import { useRouter } from "next/router";
// import ComicCard from "./ComicCard.component";
// import { ThemeProvider } from "@mui/material/styles";
// import yourTheme from "path-to-your-theme"; // If you have a custom MUI theme

// jest.mock("next/router", () => ({
//   useRouter: jest.fn()
// }));

// describe("ComicCard", () => {
//   let mockUseRouter: jest.MockedFunction<typeof useRouter>;
//   let mockPush: jest.Mock;

//   beforeEach(() => {
//     mockPush = jest.fn();
//     mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
//     mockUseRouter.mockReturnValue({
//       push: mockPush,
//       pathname: "/", // Default path
//       query: {},
//       asPath: "",
//       prefetch: jest.fn()
//     });
//   });

//   const resultMock = {
//     thumbnail: {
//       path: "some-path",
//       extension: "jpg"
//     },
//     title: "Sample Title",
//     id: "1",
//     stock: true
//   };

//   it("renders correctly", () => {
//     render(
//         <ComicCard result={resultMock} />
//     );

//     expect(screen.getByText(resultMock.title)).toBeInTheDocument();
//   });

//   it("renders correct buttons for root path", () => {
//     render(
//       <ThemeProvider theme={yourTheme}>
//         <ComicCard result={resultMock} />
//       </ThemeProvider>
//     );

//     expect(screen.getByText("DETALLE")).toBeInTheDocument();
//     expect(screen.getByText("COMPRAR")).toBeInTheDocument();
//   });

//   it("redirects to correct page on DETALLE button click", () => {
//     render(
//       <ThemeProvider theme={yourTheme}>
//         <ComicCard result={resultMock} />
//       </ThemeProvider>
//     );

//     fireEvent.click(screen.getByText("DETALLE"));
//     expect(mockPush).toHaveBeenCalledWith(`/comics/${resultMock.id}`);
//   });

//   // ... More tests for other paths and button actions ...

// });

