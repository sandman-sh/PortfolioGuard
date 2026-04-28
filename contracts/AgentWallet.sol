// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AgentWallet is Ownable {
    event CallExecuted(address indexed target, uint256 value, bytes data, bytes result);

    constructor(address initialOwner) Ownable(initialOwner) {}

    receive() external payable {}

    function execute(address target, uint256 value, bytes calldata data)
        external
        onlyOwner
        returns (bytes memory result)
    {
        (bool ok, bytes memory response) = target.call{value: value}(data);
        require(ok, "EXECUTION_FAILED");
        emit CallExecuted(target, value, data, response);
        return response;
    }
}
