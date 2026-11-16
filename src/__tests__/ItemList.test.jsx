import { render, screen, act } from "@testing-library/react";
import ItemList from "../components/ItemList";
const originalFetch = global.fetch;
const data = {
  query: {
    pages: Object.fromEntries(
      Array.from({ length: 5 }, (_, i) => [
        i,
        {
          pageid: i,
          title: `File:Library ${i + 1}.jpg`,
          imageinfo: [
            {
              thumburl: `https://example.com/${i}.jpg`,
              descriptionurl: `https://example.com/source/${i}`,
            },
          ],
        },
      ]),
    ),
  },
};
beforeEach(() => {
  global.fetch = jest
    .fn()
    .mockResolvedValue({ ok: true, json: async () => data });
});
afterEach(() => {
  global.fetch = originalFetch;
});
test("рендерить компонент і п’ять карток", async () => {
  render(<ItemList />);
  expect(
    screen.getByRole("region", { name: "Галерея зображень" }),
  ).toBeInTheDocument();
  expect(await screen.findAllByTestId("image-card")).toHaveLength(5);
});
test("показує завантаження до відповіді", async () => {
  let resolve;
  global.fetch.mockImplementation(
    () =>
      new Promise((r) => {
        resolve = r;
      }),
  );
  render(<ItemList />);
  expect(screen.getByRole("status")).toHaveTextContent("Завантаження...");
  await act(async () => {
    resolve({ ok: true, json: async () => data });
  });
  expect(screen.queryByRole("status")).not.toBeInTheDocument();
  expect(screen.getAllByTestId("image-card")).toHaveLength(5);
});
test("показує помилку сервера", async () => {
  global.fetch.mockResolvedValue({ ok: false, status: 500 });
  render(<ItemList />);
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Помилка завантаження даних",
  );
});
test("показує помилку мережі", async () => {
  global.fetch.mockRejectedValue(new Error("Offline"));
  render(<ItemList />);
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Помилка завантаження даних",
  );
});
