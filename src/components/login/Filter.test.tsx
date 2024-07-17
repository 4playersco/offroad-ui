import { render, screen, act, wait } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import Filter from "./Filter";
import { CURRENT_USER_QUERY } from "../../hooks/useUser/useUser.graphql";

const testRender = async (component, mocks, shouldWait = true) => {
  const container = render(
    <MockedProvider mocks={mocks}>{component}</MockedProvider>
  );

  if (shouldWait) {
    await wait();
  }

  return container;
};

const createMock = (overrides = {}) => {
  return {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: {
      data: {
        myself: {
          id: "1",
          username: "winner",
          email: "nbonaparte@military.it",
          firstName: "Napoleon",
          role: "USER",
          accountStatus: "ACTIVE",
          accountType: "FULL",
          avatar: {
            id: "abc",
            url: "http://americaonline.com",
            smallUrl: "http://aol.com",
          },
          ...overrides,
        },
      },
    },
  };
};

describe("Filter", () => {
  let mocks;

  beforeEach(() => {
    mocks = [createMock()];
  });

  it("should load", async () => {
    await testRender(<Filter />, mocks);
  });

  it("should show loading message", async () => {
    const content = "Loading...";

    const { getByText } = await testRender(
      <Filter>{content}</Filter>,
      mocks,
      false
    );

    expect(getByText(content)).toBeInTheDocument();
    await wait();
  });

  xit("should show error message", () => {});

  it("should fail content when NO checks are passed", async () => {
    const content = "meow meow meow";

    const { queryByText } = await testRender(<Filter>{content}</Filter>, mocks);

    expect(queryByText(content)).not.toBeInTheDocument();
  });

  describe("role check", () => {
    it("should fail when no value is passed", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter roleCheck={undefined}>{content}</Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });

    it("should pass when value returned is true", async () => {
      const content = "meow meow meow";

      const { getByText } = await testRender(
        <Filter roleCheck={() => true}>{content}</Filter>,
        mocks
      );

      expect(getByText(content)).toBeInTheDocument();
    });

    it("should fail when value returned is false", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter roleCheck={() => false}>{content}</Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });
  });

  describe("status check", () => {
    it("should fail when no value is passed", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter statusCheck={undefined}>{content}</Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });

    it("should pass when value returned is true", async () => {
      const content = "meow meow meow";

      const { getByText } = await testRender(
        <Filter statusCheck={() => true}>{content}</Filter>,
        mocks
      );

      expect(getByText(content)).toBeInTheDocument();
    });

    it("should fail when value returned is false", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter statusCheck={() => false}>{content}</Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });
  });

  describe("type check", () => {
    it("should fail when no value is passed", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter typeCheck={undefined}>{content}</Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });

    it("should pass when value returned is true", async () => {
      const content = "meow meow meow";

      const { getByText } = await testRender(
        <Filter typeCheck={() => true}>{content}</Filter>,
        mocks
      );

      expect(getByText(content)).toBeInTheDocument();
    });

    it("should fail when value returned is false", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter typeCheck={() => false}>{content}</Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });
  });

  describe("self check", () => {
    it("should fail when no value is passed", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter selfCheck={undefined}>{content}</Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });

    it("should fail when `onlySelfCheck` value is passed", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter selfCheck="winner" onlySelfCheck="winner">
          {content}
        </Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });

    it("should pass when correct username is passed in", async () => {
      const content = "meow meow meow";

      const { getByText } = await testRender(
        <Filter selfCheck="winner">{content}</Filter>,
        mocks
      );

      expect(getByText(content)).toBeInTheDocument();
    });

    it("should pass when incorrect username is passed in AND other check passes", async () => {
      const content = "meow meow meow";

      const { getByText } = await testRender(
        <Filter selfCheck="loser" roleCheck={() => true}>
          {content}
        </Filter>,
        mocks
      );

      expect(getByText(content)).toBeInTheDocument();
    });

    it("should NOT pass when incorrect username is passed in", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter selfCheck="loser">{content}</Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });

    it("should NOT pass when incorrect username is passed in AND other check fails", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter selfCheck="loser" roleCheck={() => false}>
          {content}
        </Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });
  });

  describe("only self check", () => {
    it("should fail when no value is passed", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter onlySelfCheck={undefined}>{content}</Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });

    it("should fail when `onlySelfCheck` value is passed", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter selfCheck="winner" onlySelfCheck="winner">
          {content}
        </Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });

    it("should pass when correct username is passed in", async () => {
      const content = "meow meow meow";

      const { getByText } = await testRender(
        <Filter onlySelfCheck="winner">{content}</Filter>,
        mocks
      );

      expect(getByText(content)).toBeInTheDocument();
    });

    it("should NOT pass when incorrect username is passed in", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter onlySelfCheck="loser">{content}</Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });

    it("should NOT pass when incorrect username is passed in AND other check succeeds", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter onlySelfCheck="loser" roleCheck={() => true}>
          {content}
        </Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });
  });

  describe("multiple checks", () => {
    it("should pass when role AND status value returned is true", async () => {
      const content = "meow meow meow";

      const { getByText } = await testRender(
        <Filter roleCheck={() => true} statusCheck={() => true}>
          {content}
        </Filter>,
        mocks
      );

      expect(getByText(content)).toBeInTheDocument();
    });

    it("should pass when role AND type value returned is true", async () => {
      const content = "meow meow meow";

      const { getByText } = await testRender(
        <Filter roleCheck={() => true} typeCheck={() => true}>
          {content}
        </Filter>,
        mocks
      );

      expect(getByText(content)).toBeInTheDocument();
    });

    it("should pass when status AND type value returned is true", async () => {
      const content = "meow meow meow";

      const { getByText } = await testRender(
        <Filter statusCheck={() => true} typeCheck={() => true}>
          {content}
        </Filter>,
        mocks
      );

      expect(getByText(content)).toBeInTheDocument();
    });

    it("should pass when role, status AND type value returned is true", async () => {
      const content = "meow meow meow";

      const { getByText } = await testRender(
        <Filter
          roleCheck={() => true}
          statusCheck={() => true}
          typeCheck={() => true}
        >
          {content}
        </Filter>,
        mocks
      );

      expect(getByText(content)).toBeInTheDocument();
    });

    it("should NOT pass when role value returned is false AND status value returned is true", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter roleCheck={() => false} statusCheck={() => true}>
          {content}
        </Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });

    it("should NOT pass when role value returned is true AND status value returned is false", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter roleCheck={() => true} statusCheck={() => false}>
          {content}
        </Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });

    it("should NOT pass when role value returned is false AND status value returned is false", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter roleCheck={() => false} statusCheck={() => false}>
          {content}
        </Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });

    it("should NOT pass when role value returned is false AND type value returned is true", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter roleCheck={() => false} typeCheck={() => true}>
          {content}
        </Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });

    it("should NOT pass when role value returned is true AND type value returned is false", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter roleCheck={() => true} typeCheck={() => false}>
          {content}
        </Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });

    it("should NOT pass when role AND type value returned is false", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter roleCheck={() => false} typeCheck={() => false}>
          {content}
        </Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });

    it("should NOT pass when status value returned is false AND type value returned is true", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter statusCheck={() => false} typeCheck={() => true}>
          {content}
        </Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });

    it("should NOT pass when status value returned is true AND type value returned is false", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter statusCheck={() => true} typeCheck={() => false}>
          {content}
        </Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });

    it("should NOT pass when status AND type value returned is false", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter statusCheck={() => false} typeCheck={() => false}>
          {content}
        </Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });

    it("should NOT pass when role value returned is false AND status and type values returned are true", async () => {
      const content = "meow meow meow";

      const { queryByText } = await testRender(
        <Filter
          roleCheck={() => false}
          statusCheck={() => true}
          typeCheck={() => true}
        >
          {content}
        </Filter>,
        mocks
      );

      expect(queryByText(content)).not.toBeInTheDocument();
    });

    // !role + !status + type
    // !role + !status + !type
    // role + !status + type
    // role + !status + !type
    // role + status + !type
  });
});
