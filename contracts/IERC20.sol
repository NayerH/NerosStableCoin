//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

abstract contract ERC20Interface {
    function totalSupply() public view virtual returns (uint256);
    function balanceOf(address tokenOwner) public view virtual returns (uint);
    function allowance(address tokenOwner, address spender) public view virtual returns (uint);
    function transfer(address payable to, uint tokens) public virtual returns (bool);
    function approve(address spender, uint tokens)  public virtual returns (bool);
    function transferFrom(address from, address payable to, uint tokens) public virtual returns (bool);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}
