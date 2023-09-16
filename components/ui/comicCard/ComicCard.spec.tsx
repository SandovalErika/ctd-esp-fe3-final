// import { render, fireEvent, screen } from "@testing-library/react";
// import ComicCard from "./ComicCard.component";

// jest.mock("next/router", () => ({
//   useRouter: jest.fn(),
// }));

// import { useRouter } from "next/router";

// describe("ComicCard", () => {
//   let mockUseRouter: jest.MockedFunction<typeof useRouter>;
//   let mockPush: jest.Mock;

//   beforeEach(() => {
//     mockPush = jest.fn();
//     mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
//     mockUseRouter.mockReturnValue({
//         push: mockPush,
//         replace: jest.fn(),
//         pathname: "/",
//         route: "/",
//         basePath: "",
//         asPath: "",
//         prefetch: jest.fn(),
//         query: {},
//         isFallback: false,
//         isReady: true,
//         isLocaleDomain: false,
//         events: {
//             on: jest.fn(),
//             off: jest.fn(),
//             emit: jest.fn(),
//         },
//         reload: jest.fn(),
//         back: jest.fn(),
//         beforePopState: jest.fn(),
//         isPreview: false
//     });
//   });

//   export interface Result {
//     id: "";
//     digitalId: 0;
//     title: "";
//     issue0: 0;
//     variantDescription: "";
//     description: null | "";
//     modified: "";
//     isbn: "";
//     upc: "";
//     diamondCode: {};
//     ean: "";
//     issn: "";
//     format: "";
//     pageCount: 0;
//     textObjects: [];
//     resourceURI: "";
//     urls: [];
//     series: {};
//     variants: [];
//     collections: [];
//     collectedIssues: [];
//     dates: [];
//     prices: [];
//     price: 0;
//     oldPrice: 0;
//     stock:0;
//     thumbnail: {};
//     images: [];
//     creators: {}};
//     characters: {};
//     stories: {};
//     events: {};
// }


//   it("renders correctly", () => {
//     render(<ComicCard result={resultMock} />);

//     expect(screen.getByText(resultMock.title)).toBeInTheDocument();
//   });

//   it("renders correct buttons for root path", () => {
//     render(<ComicCard result={resultMock} />);

//     expect(screen.getByText("DETALLE")).toBeInTheDocument();
//     expect(screen.getByText("COMPRAR")).toBeInTheDocument();
//   });

//   it("redirects to correct page on DETALLE button click", () => {
//     render(<ComicCard result={resultMock} />);

//     fireEvent.click(screen.getByText("DETALLE"));
//     expect(mockPush).toHaveBeenCalledWith(`/comics/${resultMock.id}`);
//   });

//   // ... More tests for other paths and button actions ...
// })