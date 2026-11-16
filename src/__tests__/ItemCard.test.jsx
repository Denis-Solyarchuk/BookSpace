import { render, screen } from "@testing-library/react";
import ItemCard from "../components/ItemCard";
const item = {
  id: 1,
  title: "Library",
  url: "https://example.com/library.jpg",
  source: "https://example.com/source",
};
test("рендерить зображення та посилання", () => {
  render(<ItemCard item={item} />);
  expect(screen.getByRole("img", { name: "Library" })).toHaveAttribute(
    "src",
    item.url,
  );
  expect(screen.getByRole("link")).toHaveAttribute("href", item.source);
});
test("snapshot картки", () => {
  const { asFragment } = render(<ItemCard item={item} />);
  expect(asFragment()).toMatchSnapshot();
});
